export default function Error({ error }: { error: string }) {
  return (
    <p className='text-primary-foreground bg-destructive px-4 py-2 rounded mb-3'>
      {error}
    </p>
  );
}
