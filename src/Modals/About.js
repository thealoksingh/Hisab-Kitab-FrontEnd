import React from "react";
import { Linkedin, Github ,ArrowLeft } from "lucide-react";
function About() {
  return (
    <>
      {/* About Us Description */}
      <section className="py-16 bg-gray-50 ">
        <button
          onClick={() => window.history.back()}
          className=" fixed top-10 lg:left-16 left-6 bg-gray-500 text-white rounded-full p-2 hover:bg-gray-600"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="container mx-auto px-4  text-center pr-16 pl-16 ">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-sm text-justify text-gray-600 leading-relaxed">
            We are a team of four{" "}
            <strong>Ravi Kumar, Alok Singh, Jaysingh Patel,</strong> and{" "}
            <strong> Anukrity Shrivastava </strong> who came together to build a
            simple yet powerful platform to manage financial transactions. The
            idea sparked from our own daily struggles with tracking expenses and
            managing shared spending among friends. We wanted a tool that felt
            personal, secure, and actually useful in daily life.
          </p>
          <p className="text-sm text-justify text-gray-600 leading-relaxed mt-4">
            This project, Hisab Kitab, is inspired by{" "}
            <a
              className="text-blue-500 underline"
              href="https://khatabook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              KhataBook
            </a>
            . While KhataBook focuses mainly on commercial use, we noticed it
            lacked support for personal and two-way transaction updates. That’s
            where Hisab Kitab steps in—offering a platform to manage personal
            expenses, transactions between friends, group spending, and bill
            splitting. Currently, the "Between Friends" transaction module is
            live, while other features are under development.
          </p>
          <p className="text-sm text-justify text-gray-600 leading-relaxed mt-4">
            In the live module, users can send friend requests and add expenses
            with a description, amount, and date. Only the transaction creator
            can update or delete entries, ensuring data integrity. Each
            transaction includes a dedicated comment box where friends can
            discuss or raise concerns. Users also have the ability to download
            their expense reports and unfriend users if needed. If they
            reconnect in the future, their old transaction history will still be
            accessible.
          </p>
          <p className="text-sm text-justify text-gray-600 leading-relaxed mt-4">
            Security is a priority, and we’ve integrated Spring Security to
            protect user data. Unlike KhataBook, both users involved in a
            transaction can view, update, and interact with it making Hisab
            Kitab truly collaborative and user-friendly.
          </p>
          <strong className="text-sm text-gray-600 leading-relaxed mt-4">
            We’re building more than just a tracker , we’re building trust in
            financial collaboration.
          </strong>
        </div>
      </section>

      {/* 1st section */}
      <section id="section_3" className="p-16  bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-80 h-80 rounded-full border-4 border-gray-500 overflow-hidden flex items-center justify-center">
              <img
                src="/alok.png"
                alt="Author"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="lg:w-2/3 w-full">
              <h6 className="text-sm text-gray-500 uppercase tracking-wide">
                Meet
              </h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ravi Kumar
              </h2>
              <p className="text-gray-600  text-justify text-sm mb-4">
                I'm Alok Singh, a final-year Information Technology student at
                Sinhgad College of Engineering, Pune. I’m a passionate
                full-stack developer. I’ve built real-world projects using MVC
                architecture, including both web and mobile applications.
                Currently, I'm working as a Full Stack Intern at VaishaliTech,
                where I’m gaining valuable industry experience. I also take on
                freelance projects, helping clients turn their ideas into
                scalable, user-friendly solutions. I enjoy building meaningful
                digital products that blend clean code with thoughtful design..
              </p>
              <p className="text-gray-600   text-justify text-sm">
                This platform is one of our proud projects, built to simplify
                and organize financial transactions among friends and groups.
                We're constantly working to improve it and would love your
                feedback. If you find any bugs or have suggestions, feel free to
                reach out to us through the Help & Support section or connect
                with us on LinkedIn.
                {/* <span className="font-bold text-sm">
                  “Design is not just what it looks like—it’s how it works.”
                </span> */}
              </p>
              <div className="text-left">
                <p className="font-semibold mt-2">Connect with me:</p>
                <div className="flex items-center space-x-4 mt-1">
                  <a
                    href="https://www.linkedin.com/in/alok-singh-74963b24b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  text-blue-600 hover:underline"
                  >
                    <Linkedin className="w-5 h-5 mr-1" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/thealoksingh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  text-gray-800 hover:underline"
                  >
                    <Github className="w-5 h-5 mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd section */}
      <section id="section_2" className="p-16  bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="lg:w-2/3 w-full">
              <h6 className="text-sm text-gray-500 uppercase tracking-wide">
                Meet
              </h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Jaysingh Patel
              </h2>
              <p className="text-gray-600  text-justify text-sm mb-4">
                I’m Jaysingh Patel, co-founder of this platform and part of the
                development team that brought this idea to life. I have a deep
                interest in building clean, reliable, and scalable software
                solutions that solve real-world problems.
              </p>
              <p className="text-gray-600  text-justify text-sm">
                In this project, I collaborated closely with Alok on the
                frontend design and development while also contributing to
                backend logic and system integration. From planning the
                architecture to refining the user experience, my focus was on
                ensuring the platform remains smooth, responsive, and
                user-focused. Working on this product has been a valuable
                journey—sharpening both my technical and collaborative skills.
                Together with Alok and Ravi, we’ve built a solution that
                reflects not just our coding abilities, but our shared vision
                and dedication to quality.
                <span className="font-bold text-sm">
                  “Build with purpose. Code with clarity.”
                </span>
              </p>
              <div className="text-left">
                <p className="font-semibold mt-2">Connect with me:</p>
                <div className="flex items-center space-x-4 mt-1">
                  <a
                    href="https://www.linkedin.com/in/jaysinghpatel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  text-blue-600 hover:underline"
                  >
                    <Linkedin className="w-5 h-5 mr-1" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/Jaysingh2003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  text-gray-800 hover:underline"
                  >
                    <Github className="w-5 h-5 mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="w-80 h-80 rounded-full border-4 border-gray-500  overflow-hidden ">
              <img
                src="/jay.png"
                alt="Author"
                className="w-90 h-90 object-cover alig-center justify-center   rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3rd section */}
      <section id="section_3" className="p-16  bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-80 h-80 rounded-full border-4 border-gray-500 overflow-hidden flex items-center justify-center">
              <img
                src="/alok.png"
                alt="Author"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="lg:w-2/3 w-full">
              <h6 className="text-sm text-gray-500 uppercase tracking-wide">
                Meet
              </h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Alok Singh
              </h2>
              <p className="text-gray-600  text-justify text-sm mb-4">
                I'm Alok Singh, a final-year Information Technology student at
                Sinhgad College of Engineering, Pune. I’m a passionate
                full-stack developer. I’ve built real-world projects using MVC
                architecture, including both web and mobile applications.
                Currently, I'm working as a Full Stack Intern at VaishaliTech,
                where I’m gaining valuable industry experience. I also take on
                freelance projects, helping clients turn their ideas into
                scalable, user-friendly solutions. I enjoy building meaningful
                digital products that blend clean code with thoughtful design..
              </p>
              <p className="text-gray-600  text-justify text-sm">
                This platform is one of our proud projects, built to simplify
                and organize financial transactions among friends and groups.
                We're constantly working to improve it and would love your
                feedback. If you find any bugs or have suggestions, feel free to
                reach out to us through the Help & Support section or connect
                with us on LinkedIn.
                {/* <span className="font-bold text-sm">
                  “Design is not just what it looks like—it’s how it works.”
                </span> */}
              </p>
              <div className="text-left">
                <p className="font-semibold mt-2">Connect with me:</p>
                <div className="flex items-center space-x-4 mt-1">
                  <a
                    href="https://www.linkedin.com/in/alok-singh-74963b24b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  text-blue-600 hover:underline"
                  >
                    <Linkedin className="w-5 h-5 mr-1" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/thealoksingh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex  text-gray-800 hover:underline"
                  >
                    <Github className="w-5 h-5 mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
