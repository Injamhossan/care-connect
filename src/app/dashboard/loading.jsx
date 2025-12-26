import Loader from "@/components/common/Loader";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Loader fullScreen={false} />
    </div>
  );
}
