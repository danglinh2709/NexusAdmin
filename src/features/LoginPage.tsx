import { Button } from "../components/customControl/Button";
import { Input } from "../components/customControl/Input";
import { useLogin } from "../hooks/auth/useLogin";

export default function LoginPage() {
  const {
    email,
    password,
    loading,
    error,
    fieldErrors,
    setEmail,
    setPassword,
    submit,
  } = useLogin();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f4f7fe] p-4 font-sans">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-[#5850eb] rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-[#5850eb]/30">
          <span className="text-white font-bold text-xl uppercase italic">
            N
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Nexus Admin</h1>
        <p className="text-gray-500 text-sm">Sign in to manage your system</p>
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-10">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
          />

          <Button
            variant="primary"
            type="submit"
            fullWidth
            size="lg"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
