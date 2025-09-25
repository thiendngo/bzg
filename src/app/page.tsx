import CardTabs from "@/components/dashboard/CardTabs";

export default function Page() {
    return (
        <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Jane</h1>
            <CardTabs />
        </div>
    );
}
