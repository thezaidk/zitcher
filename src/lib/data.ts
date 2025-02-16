
export const links = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Hire",
        path: "/hire"
    },
    {
        name: "Work",
        path: "/work"
    },
    {
        name: "About",
        path: "/about"
    }
]

export const candidateNavLinks = [
    {
        title: "Find project",
        links: [
            {
                linkName: "Find project",
                linkPath: "/candidate/find-project"
            },
        ]
    },
    {
        title: "Deliver project",
        links: [
            {
                linkName: "Your active contribution",
                linkPath: "/candidate/active-contributions"
            },
            {
                linkName: "Your contribution history",
                linkPath: "/candidate/contributions"
            },
        ]
    },
    {
        title: "Messages",
        links: [
            {
                linkName: "Messages",
                linkPath: "/candidate/messages"
            },
        ]
    }
]

export const recruiterNavLinks = [
    {
        title: "Find candidate",
        links: [
            {
                linkName: "Find candidate",
                linkPath: "/recruiter/find-candidate"
            },
        ]
    },
    {
        title: "Manage project",
        links: [
            {
                linkName: "Create project",
                linkPath: "/recruiter/create-project"
            },
            {
                linkName: "Your active project",
                linkPath: "/recruiter/active-projects"
            },
            {
                linkName: "Your project history",
                linkPath: "/recruiter/projects"
            },
        ]
    },
    {
        title: "Messages",
        links: [
            {
                linkName: "Messages",
                linkPath: "/recruiter/messages"
            },
        ]
    }
]

export const candidateSlides = [
    {
        desc: "Discover a variety of projects and assignments posted by recruiters. Find a project that suits your skills and interests.",
        heading: "Browse Available Projects",
        button: "Explore",
        href: "/candidate/find-project/",
    },
    {
      desc: "Submit your assignment to demonstrate your skills to recruiters. Stand out and increase your chances of being shortlisted.",
      heading: "Submit Your Work",
      button: "Get Started",
        href: "/candidate/active-contributions",
    },
    {
      desc: "Keep track of your application status, from submission to shortlist notifications.",
      heading: "Track Your Progress",
      button: "View Status",
      href: "/candidate/contributions",
    },
]

export const recruiterSlides = [
    {
        desc: "Easily post your projects, assignments, or freelance opportunities to attract skilled contributors and collaborators.",
        heading: "Post Your Projects",
        button: "Get Started",
        href: "/recruiter/create-project/",
    },
    {
        desc: "Review submissions from candidates, evaluate their work, and find the best talent for your project or organization.",
        heading: "Evaluate Submissions",
        button: "Review Now",
        href: "/recruiter/active-projects/",
    },
    {
        desc: "Seamlessly collaborate with selected candidates, manage project milestones, and ensure successful completion.",
        heading: "Manage Projects",
        button: "Manage Now",
        href: "/recruiter/projects/",
    },
];