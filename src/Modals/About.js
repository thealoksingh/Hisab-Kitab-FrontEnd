import React from 'react'

function About() {
  return (
     <>
      {/* About Us Description */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center w-[80%]  ">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are a team of three—<strong>Ravi Verma</strong>, <strong>Alok singh</strong>,and <strong>jaysingh patel</strong>—who came together to build a simple yet powerful platform to manage financial transactions.
            The idea sparked from our own daily struggles with tracking expenses and maintaining budgets. We wanted to create a solution that’s easy to use, secure, and actually helpful in real-life money management.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            The project was built through true collaboration. From brainstorming features to writing code and designing the interface, every decision was made as a team. We used technologies like React, Java Spring Boot, and MySQL,
            and ensured user data remains secure through proper authentication and encryption. We also focused on building a clean, user-friendly UI to make financial tracking feel less like a chore.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Of course, we faced our share of challenges—integrating features like transaction history, handling backend logic, and managing time alongside college commitments—but those hurdles only made our teamwork stronger.
            This project taught us a lot about real-world development, and we’re excited to keep improving it with new features like budget insights and multi-device access.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            We believe that managing finances shouldn’t be complicated—and we’re here to make it simple, one step at a time.
          </p>
        </div>
      </section>

      {/* 1st section */}
      <section id="section1" className="py-16  bg-gray-50">
        <div className="container mx-auto bg-gray-50 px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-80 h-80 rounded-full border-10 border-blue-600  overflow-hidden ">
 
              <img
                src="/jay.png"
                alt="Author"
                className="w-90 h-90 object-cover alig-center justify-center  rounded-full"
              />
            </div>
            <div className="lg:w-2/3 w-full">
              <h6 className="text-sm text-gray-500 uppercase tracking-wide">Meet Author</h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Prof. Sophia</h2>
              <p className="text-gray-600 mb-4">
                This is an ebook landing page template with Bootstrap 5 CSS framework. It is easy to customize with the use of Bootstrap CSS classes.
              </p>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consive adipisicing elit, sed do eiusmod. tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd section */}
      <section id="section_2" className="py-16  bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="lg:w-2/3 w-full">
              <h6 className="text-sm text-gray-500 uppercase tracking-wide">Meet Author</h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Prof. Sophia</h2>
              <p className="text-gray-600 mb-4">
                I’m Jaysingh Patel, co-founder of this platform and part of the development team that brought this idea to life. I have a deep interest in building clean, reliable, and scalable software solutions that solve real-world problems.
              </p>
              <p className="text-gray-600">
                In this project, I collaborated closely with Alok on the frontend design and development while also contributing to backend logic and system integration. From planning the architecture to refining the user experience, my focus was on ensuring the platform remains smooth, responsive, and user-focused.

                Working on this product has been a valuable journey—sharpening both my technical and collaborative skills. Together with Alok and Ravi, we’ve built a solution that reflects not just our coding abilities, but our shared vision and dedication to quality.

               “Build with purpose. Code with clarity.”

              </p>
              <div className="text-right">
              <p className="font-semibold">Connect with me:</p>
               <p className="space-x-2">
                <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
               LinkedIn
                   </a>
                   |
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
           GitHub
           </a>
            </p>
            </div>
            </div>
            <div className="w-80 h-80 rounded-full border-10 border-blue-600  overflow-hidden ">
 
              <img
                src="/jay.png"
                alt="Author"
                className="w-90 h-90 object-cover alig-center justify-center  rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3rd section */}
      <section id="section_3" className="py-16  bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            
            
            <div className="w-80 h-80 rounded-full border-10 border-blue-600  overflow-hidden ">
 
              <img
                src="/alok.png"
                alt="Author"
                className="w-90 h-90 object-cover alig-center justify-center  rounded-full"
              />
            </div>
            <div className="lg:w-2/3 w-full">
              <h6 className="text-sm text-gray-500 uppercase tracking-wide">Meet Author</h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Prof. Sophia</h2>
              <p className="text-gray-600 mb-4">
                I’m Alok Kumar, co-founder of this platform and part of the core development team. My interest lies in crafting intuitive and user-friendly interfaces, ensuring that users have a seamless experience while navigating and interacting with our application.
              </p>
              <p className="text-gray-600">
                Throughout the project, I worked closely with Jaysingh on the frontend design and implementation, while also contributing to backend logic and integration. Our collaborative approach allowed us to brainstorm, iterate, and deliver features that aligned with both user expectations and technical efficiency.

                      This experience not only enhanced my development skills but also taught me the value of teamwork, shared problem-solving, and delivering a consistent user experience across the platform.

                  “Design is not just what it looks like—it’s how it works.”
              </p>
              <div className="text-left">
              <p className="font-semibold">Connect with me:</p>
               <p className="space-x-2">
                <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
               LinkedIn
                   </a>
                   |
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
           GitHub
           </a>
            </p>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About