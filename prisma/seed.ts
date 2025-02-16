import prisma from "../src/lib/prisma";

async function main() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Rohan',
      email: 'rohan@gmail.com',
      role: 'CANDIDATE',
      bio: 'Software Developer',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Zaid',
      email: 'zaid@gmail.com',
      role: 'CANDIDATE',
      bio: 'Full Stack Developer',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'John',
      email: 'john@gmail.com',
      role: 'RECRUITER',
      bio: 'Recruiter at TechCorp',
    },
  });

  // Seed Projects
  const project1 = await prisma.project.create({
    data: {
      title: 'Frontend Developer with Figma & ReactJS Expertise Needed',
      description: 'We are seeking a skilled Frontend Developer with strong experience in Figma and ReactJS to join our team. The ideal candidate will have a passion for creating visually appealing and user-friendly interfaces. You will work closely with our design team to translate Figma designs into functional React applications. If you have a keen eye for detail and a commitment to delivering high-quality work, we want to hear from you! **Relevant Skills:** - Proficient in ReactJS - Experience with Figma - Strong understanding of HTML, CSS, and JavaScript - Familiarity with responsive design principles - Ability to collaborate effectively with designers and backend developers',
      codeLink: "www.github.com",
      bounty: 55,
      recruiterId: user3.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Hiring Next.js Developer – Scalable Web App Transition + Ongoing Role',
      description: 'Were looking for an experienced Next.js developer to work in a team and help transition our site from WordPress to a modern, high-performance Next.js and React-based web app. The project focuses on scalability, speed, and SEO optimization, leveraging server-side rendering (SSR), static site generation (SSG), and API integrations. <br/> What Youll Do:<br/>Convert existing WordPress functionality into a scalable Next.js architecture.<br/>Optimize performance, caching, and server-side rendering.<br/>Integrate APIs and improve front-end interactivity.<br/>Ensure the site remains fast, responsive, and SEO-friendly.<br/>What Were Looking For:<br/>Strong experience with Next.js, React, and API development.<br/>Familiarity with headless CMS setups and WordPress migrations is a plus.<br/> This is a remote, contract-based role with potential for ongoing work.<br/>We will be interviewing from lowest-priced proposals up, so if you want to be considered bid the lowest hourly rate. There is the opportunity to stay with the business for the right candidate as we have long-term react conversions happening across the enterprise. Long-term engagement also provides the opportunity to join our ESOP and other options to benefit from company growth. Only independent contractors should apply. Agencies will not be considered.',
      recruiterId: user3.id,
    },
  });

  // Pin Projects
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      pinnedProjects: {
        connect: [{ id: project1.id }],
      },
    },
  });

  await prisma.user.update({
    where: { id: user3.id },
    data: {
      pinnedProjects: {
        connect: [{ id: project1.id }],
      },
    },
  });

  // Seed Submissions
  await prisma.submission.create({
    data: {
      projectId: project1.id,
      candidateId: user1.id,
      title: "Fixed the linting bugs.",
      link: 'https://github.com/alice/portfolio',
    },
  });

  console.log('Dummy data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
