export default function NotFound() {
    return (
        <div className="flex h-full items-center justify-center bg-background text-foreground">
            <div className="rounded-lg border bg-card p-8 text-center shadow">
                <h1 className="text-3xl font-bold">404</h1>
                <p className="mt-2 text-muted-foreground">
                    Oops! The page you’re looking for does not exist.
                </p>
            </div>
        </div>
    );
}
