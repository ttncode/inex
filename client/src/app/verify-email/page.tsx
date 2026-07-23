import { TfiEmail } from "react-icons/tfi";

export default function VerifyEmail() {
  return (
    <section className="h-screen w-screen bg-[#e8e6e6]">
      <main className="flexCenter w-full h-full">
        <div className="relative flexCenter flex-col lg:w-1/2 md:w-2/3 sms:w-full h-fit py-20 shadow-lg bg-white m-10">
          <div className="absolute top-0 left-0 flexCenter w-full h-12 bg-paragraph">
            <h1 className="text-white font-bold text-xl">Verify Email</h1>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flexCenter border-4px text-paragraph">
              <div className="flexCenter h-fit w-fit p-4 border-[4px] border-solid border-paragraph rounded-full">
                <TfiEmail className="text-4xl" />
              </div>
            </div>
            <span className="max-w-[350px] text-lg text-paragraph text-center">
              We have sent you an email to confirm. Please log in and confirm registration at your email.
            </span>
          </div>
        </div>
      </main>
    </section>
  );
}
