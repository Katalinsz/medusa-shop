import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      {/* Modern Card Container */}
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wide mb-2">
            Welcome Back
          </h1>
          <p className="text-emerald-50 text-sm">
            Sign in to access an enhanced shopping experience
          </p>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <form className="w-full" action={formAction}>
            <div className="flex flex-col w-full gap-y-5">
              {/* Email Input */}
              <Input
                label="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                data-testid="email-input"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400"
              />

              {/* Password Input */}
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                data-testid="password-input"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mt-3">
              <a
                href="#"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <ErrorMessage error={message} data-testid="login-error-message" />

            {/* Enhanced Submit Button */}
            <SubmitButton
              data-testid="sign-in-button"
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 uppercase tracking-wide text-sm"
            >
              <span className="flex items-center justify-center gap-2">
                Sign in
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </SubmitButton>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                New to our store?
              </span>
            </div>
          </div>

          {/* Register Link Section */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              Not a member?{" "}
              <button
                onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200"
                data-testid="register-button"
              >
                Join us
              </button>
            </p>

            {/* Create Account Button */}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 uppercase tracking-wide text-sm"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Secure connection</span>
      </div>
    </div>
  )
}

export default Login
