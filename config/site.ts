export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CYP",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Templates",
      href: "/templates",
    },
    {
      label: "Tutor",
      href: "#tutor",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Templates",
      href: "/templates",
    },
    {
      label: "Tutor",
      href: "#tutor",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/khamidullayevdev/cyp",
    twitter: "https://x.com/khamidev",
    instagram: "https://www.instagram.com/khamidullayevdev/",
    login: "/login",
    get_started: "/signup",
  },
};
