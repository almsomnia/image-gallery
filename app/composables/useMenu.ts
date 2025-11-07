export default function () {
   return useState("menu", () => {
      return [
         { label: "Portfolio", to: "/", description: "" },
         { label: "Office", to: "/office", description: "Learn more about us, our process, and service offerings." },
         { label: "Research", to: "/research", description: "Discover news, insights, and ideas that shape our work." },
         { label: "Contact", to: "/contact", description: "Reach out and start the conversation on your project." },
      ]
   })
}
