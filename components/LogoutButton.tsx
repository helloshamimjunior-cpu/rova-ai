import LogoutButton from "@/components/LogoutButton";

export default function Header() {
  return (
    <header className="flex justify-between p-4 border-b">
      <h1>Rova AI</h1>
      <LogoutButton />
    </header>
  );
}
