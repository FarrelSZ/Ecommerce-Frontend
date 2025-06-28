export const useToast = () => {
  const toasts = useState("toasts", () => [] as { id: number; title: string; color: string }[]);

  const add = ({ title, color = "green" }: { title: string; color?: string }) => {
    const id = Date.now();
    toasts.value.push({ id, title, color });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 3000);
  };

  return { toasts, add };
};
