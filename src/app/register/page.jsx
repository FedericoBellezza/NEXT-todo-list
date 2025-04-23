import AuthForm from "../components/AuthForm";

export default function Register() {
  return (
    <>
      <h1 className="text-4xl pt-10 font-bold text-center">Registrati</h1>
      <div className="flex justify-center">
        <AuthForm />
      </div>
    </>
  );
}
