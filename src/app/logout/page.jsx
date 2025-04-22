import LogoutButton from "../components/LogoutButton";

export default function logout() {
  return (
    <>
      <div className="min-h-screen container mx-auto">
        <h1 className="text-4xl pt-10 font-bold text-center">Logout</h1>
        <div className="flex justify-center py-10">
          <LogoutButton text={"Logout"}></LogoutButton>
        </div>
      </div>
    </>
  );
}
