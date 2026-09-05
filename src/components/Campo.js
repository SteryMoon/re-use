export default function Campo({ label, ...props }) {
    return (
        <label className="mb-4 block">
            <span className="text-sm text-cinza">{label}</span>
            <input
                {...props}
                className="mt-1 w-full rounded-xl bg-cinza-bg px-4 py-3 outline-none focus:ring-2 focus:ring-azul"
            />
        </label>
    );
}