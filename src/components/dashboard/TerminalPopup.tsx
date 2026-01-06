import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface TerminalPopupProps {
  open: boolean;
  onClose: () => void;
  version: string;
  model: string;
  modelName: string;
}

export const TerminalPopup = ({ open, onClose, version, model, modelName }: TerminalPopupProps) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [testId, setTestId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  // Initialize socket and run test
  useEffect(() => {
    if (!open) return;

    // Connect to WebSocket server
    const serverUrl = 'http://157.173.111.84:3001';
    console.log('Connecting to WebSocket server at', serverUrl);
    const socket = io(serverUrl);
    socketRef.current = socket;
    console.log('Socket created:', socket);

    socket.on('connect', () => {
      setOutput(prev => [...prev, '✓ Connected to test server\n']);
      setIsRunning(true);

      // Start test
      console.log('Emitting run-test:', { version, model });
      socket.emit('run-test', { version, model });
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setOutput(prev => [...prev, `\n❌ Connection error: ${error.message}\n`]);
      setIsRunning(false);
    });

    socket.on('test-started', (data) => {
      setTestId(data.testId);
      setOutput(prev => [
        ...prev,
        `\n${'='.repeat(70)}\n`,
        `Running Test: ${modelName} (${version.toUpperCase()})\n`,
        `Script: ${data.scriptPath}\n`,
        `Test ID: ${data.testId}\n`,
        `${'='.repeat(70)}\n\n`
      ]);
    });

    socket.on('test-output', (data) => {
      setOutput(prev => [...prev, data.output]);
    });

    socket.on('test-completed', (data) => {
      setExitCode(data.exitCode);
      setIsRunning(false);
      setOutput(prev => [
        ...prev,
        `\n${'='.repeat(70)}\n`,
        data.success
          ? `✅ Test completed successfully (exit code: ${data.exitCode})\n`
          : `❌ Test failed (exit code: ${data.exitCode})\n`,
        `${'='.repeat(70)}\n`
      ]);
    });

    socket.on('test-error', (data) => {
      setIsRunning(false);
      setOutput(prev => [
        ...prev,
        `\n❌ Error: ${data.error}\n`
      ]);
    });

    socket.on('error', (data) => {
      setIsRunning(false);
      setOutput(prev => [
        ...prev,
        `\n❌ Connection error: ${data.message}\n`
      ]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [open, version, model, modelName]);

  const handleClose = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setOutput([]);
    setIsRunning(false);
    setExitCode(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <DialogTitle className="flex items-center gap-2">
                {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
                {!isRunning && exitCode === 0 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {!isRunning && exitCode !== null && exitCode !== 0 && <XCircle className="h-4 w-4 text-red-500" />}
                Test Terminal - {modelName}
              </DialogTitle>
              <DialogDescription>
                {version.toUpperCase()} • {isRunning ? 'Running...' : exitCode === 0 ? 'Completed' : exitCode !== null ? 'Failed' : 'Ready'}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <ScrollArea className="h-[500px] w-full rounded-md border bg-black/95 p-4">
            <div ref={scrollRef} className="font-mono text-xs text-green-400 whitespace-pre-wrap">
              {output.length === 0 ? (
                <div className="text-gray-500">Initializing test...</div>
              ) : (
                output.map((line, idx) => (
                  <span key={idx} className={
                    line.includes('ERROR') || line.includes('✗') || line.includes('❌')
                      ? 'text-red-400'
                      : line.includes('✓') || line.includes('✅')
                      ? 'text-green-400'
                      : line.includes('WARNING')
                      ? 'text-yellow-400'
                      : line.includes('=')
                      ? 'text-blue-400'
                      : 'text-gray-300'
                  }>
                    {line}
                  </span>
                ))
              )}
              {isRunning && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1">_</span>
              )}
            </div>
          </ScrollArea>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {testId && `Test ID: ${testId}`}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOutput([])}
                disabled={isRunning}
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleClose}
                disabled={isRunning}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
