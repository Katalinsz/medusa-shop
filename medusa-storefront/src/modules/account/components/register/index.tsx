"use client"

import { useActionState, useState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const [selectedTitle, setSelectedTitle] = useState("mr")

  return (
    <div
      className="max-w-md w-full flex flex-col items-center"
      data-testid="register-page"
    >
      {/* Modern Card Container */}
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-10 text-center">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wide mb-2">
            Create Account
          </h1>
          <p className="text-teal-50 text-sm">
            Join us and get access to exclusive benefits
          </p>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <form className="w-full flex flex-col" action={formAction}>
            <div className="flex flex-col w-full gap-y-4">
              {/* Title Selection with Custom Radio Buttons */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Title
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="title"
                        value="mr"
                        checked={selectedTitle === "mr"}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-emerald-400 peer-checked:border-emerald-500 transition-all"></div>
                      <div className="absolute top-1 left-1 w-3 h-3 bg-emerald-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="ml-3 text-gray-700 font-medium group-hover:text-emerald-600 transition-colors">
                      Mr.
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="title"
                        value="ms"
                        checked={selectedTitle === "ms"}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-emerald-400 peer-checked:border-emerald-500 transition-all"></div>
                      <div className="absolute top-1 left-1 w-3 h-3 bg-emerald-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="ml-3 text-gray-700 font-medium group-hover:text-emerald-600 transition-colors">
                      Ms.
                    </span>
                  </label>
                </div>
              </div>

              {/* Name Fields in Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                />
              </div>

              {/* Email */}
              <Input
                label="Email"
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />

              {/* Phone */}
              <Input
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />

              {/* Password */}
              <Input
                label="Password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
                data-testid="password-input"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />

              {/* Birth Date - Custom Styled */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Birth Date
                </label>
                <input
                  id="birthDate"
                  name="birth_date"
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-700"
                />
              </div>
            </div>

            {/* Checkboxes Section */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="w-5 h-5 mt-0.5 text-emerald-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  <svg
                    className="inline w-4 h-4 mr-2 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Sign up for our newsletter and get exclusive deals!
                </span>
              </label>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  id="partnerOffers"
                  name="partner_offers"
                  className="w-5 h-5 mt-0.5 text-emerald-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  <svg
                    className="inline w-4 h-4 mr-2 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  Receive special offers from our partners
                </span>
              </label>
            </div>

            <ErrorMessage error={message} data-testid="register-error" />

            {/* Terms and Conditions */}
            <div className="mt-6 text-xs text-gray-600 bg-gradient-to-r from-gray-50 to-emerald-50 p-4 rounded-lg border border-gray-200">
              <svg
                className="inline w-4 h-4 mr-2 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              By creating an account, you agree to our{" "}
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
              >
                Privacy Policy
              </LocalizedClientLink>{" "}
              and{" "}
              <LocalizedClientLink
                href="/content/terms-of-use"
                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
              >
                Terms of Use
              </LocalizedClientLink>
              .
            </div>

            {/* Submit Button */}
            <SubmitButton
              className="w-full mt-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 uppercase tracking-wide text-sm"
              data-testid="register-button"
            >
              Create Account
            </SubmitButton>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 uppercase tracking-wide text-sm"
            >
              Sign In Instead
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span>Your information is safe with us</span>
      </div>
    </div>
  )
}

export default Register
