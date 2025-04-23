import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <>
      <h1 className="text-4xl pt-10 font-bold text-center">Accedi</h1>
      <div className="flex justify-center">
        <AuthForm type={"LOGIN"}></AuthForm>
      </div>
    </>
  );
}
