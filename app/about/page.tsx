import Link from "next/link";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="inline-block max-w-5xl text-left justify-center">
        <h1 className={title()}>About the project</h1>
        <div className="my-8">
          <p className="text-lg text-default-600">
            This project was created by Ammoriddin (khamidullayevdev). Its{" "}
            primary goal is to help people easily{" "}
            <span className="text-primary font-medium">
              build stunning portfolios.
            </span>{" "}
            You simply enter your information, and the website will generate a
            portfolio for you based on your chosen design. The platform is{" "}
            <span className="text-primary font-medium">free to use,</span>{" "}
            although premium subscription options are also available.
          </p>
        </div>

        <h2 className={title({ className: "mt-12", size: "sm" })}>
          Getting Started
        </h2>
        <div className="my-4">
          <p className="text-lg text-default-600">
            First, you need to{" "}
            <Link
              className="text-primary font-medium hover:underline"
              href="/signup"
            >
              register
            </Link>{" "}
            and{" "}
            <Link
              className="text-primary font-medium hover:underline"
              href="/login"
            >
              log in
            </Link>{" "}
            to your account. After that, you can visit the{" "}
            <Link
              className="text-primary font-medium hover:underline"
              href="/"
            >
              Tutorial
            </Link>{" "}
            section to view the user guide. If you would like to support the
            project, you are welcome to make a donation.
          </p>
        </div>

        <h2 className={title({ className: "mt-12", size: "sm" })}>
          About the Creator
        </h2>
        <div className="my-4">
          <p className="text-lg text-default-600">
            Hello, I am the creator of this project, and I am from Uzbekistan. I
            started developing this project on{" "}
            <a
              className="text-primary font-medium hover:underline"
              href="https://github.com/ammoriddin"
            >
              Github
            </a>{" "}
            April 27, 2025, and I am continuously working to improve it. To
            learn more about me, you can visit my{" "}
            <a
              className="text-primary font-medium hover:underline"
              href="https://github.com/ammoriddin"
            >
              Github
            </a>{" "}
            page. I hope you enjoy using this platform!
          </p>
        </div>
      </div>
    </div>
  );
}
