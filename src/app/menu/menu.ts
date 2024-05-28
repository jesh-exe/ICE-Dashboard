import { CoreMenu } from "@core/types";

export const menu: CoreMenu[] = [
  {
    id: "home",
    title: "Home",
    translate: "MENU.HOME",
    type: "item",
    icon: "home",
    url: "home",
  },
  {
    id: "Admin",
    title: "Admin",
    translate: "Admin",
    type: "collapsible",
    icon: "framer",
    role: ["admin"],
    children: [
      // {
      //   id: "sample",
      //   title: "Dashboard",
      //   translate: "MENU.ADMIN",
      //   type: "item",
      //   icon: "framer",
      //   url: "admin/dashboard",
      //   role: ["admin"],
      // },
      {
        id: "userlist",
        title: "Users",
        translate: "MENU.USERS",
        type: "item",
        icon: "user",
        url: "admin/user/table",
        role: ["admin"],
      },
    ],
  },
  {
    id: "Storage",
    title: "Storage",
    translate: "Storage",
    type: "collapsible",
    icon: "database",
    role: ["storage", "upload"],
    children: [
      {
        id: "file-uploading",
        title: "Upload",
        translate: "MENU.FILEUPLOAD",
        type: "item",
        icon: "database",
        url: "file/file-uploading",
        role: ["upload"],
      },
      {
        id: "file-drive",
        title: "file-drive",
        translate: "File Drive",
        type: "item",
        icon: "package",
        url: "file/drive",
        role: ["storage"],
      },
      {
        id: "shared",
        title: "Shared With Me",
        translate: "Shared With Me",
        type: "item",
        icon: "grid",
        url: "shared/shareddrive",
        // hidden: true,
        role: ["storage"],
      },
    ],
  },
  {
    id: "Container",
    title: "Container",
    translate: "MENU.container",
    type: "collapsible",
    icon: "cpu",
    role: ["compute"],
    children: [
      {
        id: "Instances",
        title: "Instances",
        translate: "Instances",
        type: "item",
        icon: "layers",
        role: ["compute"],
        url: "container/jobs",
      },
      {
        id: "Images",
        title: "Images",
        translate: "Images",
        type: "item",
        icon: "image",
        role: ["compute"],
        url: "container/images",
      },
      // {
      //   id: "Notebook",
      //   title: "Notebook",
      //   translate: "Notebook",
      //   type: "item",
      //   icon: "book-open",
      //   role: ["admin", "compute", "vcf", "upload", "storage"],
      //   url: "container/listnotebook",
      // },
      // {
      //   id: "History",
      //   title: "History",
      //   translate: "History",
      //   type: "item",
      //   icon: "sliders",
      //   role: ["admin", "niot", "compute"],
      //   url: "history/historyJobs",
      // },
    ],
  },

  {
    id: "Analysis",
    title: "Analysis",
    translate: "Analysis",
    type: "collapsible",
    icon: "tool",
    role: ["pipeline", "vcf"],
    children: [
      // {
      //   id: "bigdata",
      //   title: "BigData",
      //   translate: "MENU.BIGDATA",
      //   type: "collapsible",
      //   icon: "download-cloud",
      //   role: ["admin", "compute", "vcf", "upload", "storage"],
      //   children: [
      //     {
      //       id: "gatk",
      //       title: "gatk",
      //       translate: "gatk",
      //       type: "item",
      //       icon: "hard-drive",
      //       role: ["admin", "compute", "vcf", "upload", "storage"],
      //       url: "bigdata/gatk",
      //     },
      //   ],
      // },

      {
        id: "Workflow",
        title: "Workflow",
        translate: "Workflow",
        type: "item",
        icon: "sliders",
        role: ["pipeline"],
        url: "workflow/list",
      },

      {
        id: "Variant Analysis",
        title: "Variant Analysis",
        translate: "Variant Analysis",
        icon: "bar-chart-2",
        type: "item",
        role: ["vcf"],
        url: "vcfanalysis/mainpage",
      },
    ],
  },
  {
    id: "Repository",
    title: "Repository",
    translate: "Repository",
    type: "collapsible",
    icon: "hard-drive",
    role: ["repository", "curator"],
    children: [
      {
        id: "manage-project-list",
        title: "Submit",
        translate: "Submit",
        type: "item",
        icon: "package",
        url: "submit/manage-niot-form-data",
        role: ["repository"],
      },
      {
        id: "curation-dashboard",
        title: "Curation",
        translate: "Curation",
        type: "item",
        icon: "feather",
        url: "submit/curation-dashboard",
        role: ["curator"],
      },
      {
        id: "niot-blast",
        title: "BLAST",
        translate: "BLAST",
        type: "item",
        icon: "wind",
        url: "submit/blast",
        role: ["repository"],
      },

      {
        id: "Search",
        title: "Search",
        translate: "Search",
        type: "item",
        icon: "search",
        url: "search",
      },
    ],
  },
  {
    id: "login",
    title: "Login",
    translate: "MENU.ABOUT_US",
    type: "item",
    icon: "user",
    url: "user-dashboard",
    hidden: false,
  },
  {
    id: "Help",
    title: "Help",
    translate: "MENU.HELP",
    type: "collapsible",
    icon: "help-circle",
    children: [
      {
        id: "contactus",
        title: "Contact Us",
        translate: "MENU.CONTACT_US",
        type: "item",
        icon: "phone",
        url: "contactUs",
      },
      {
        id: "aboutUs",
        title: "About Us",
        translate: "MENU.ABOUT_US",
        type: "item",
        icon: "info",
        url: "aboutUs",
      },
      {
        id: "docs",
        title: "Docs",
        translate: "MENU.DOCS",
        type: "item",
        icon: "clipboard",
      },
    ],
  },
];