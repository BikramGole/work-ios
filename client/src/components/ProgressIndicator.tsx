interface ProgressIndicatorProps {
  progress: number;
}

export default function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
