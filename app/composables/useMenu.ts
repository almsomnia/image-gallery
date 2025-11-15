export default function () {
   return useState("menu", () => {
      return [
         { label: "Portfolio", to: "/", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit ipsam." },
         { label: "Office", to: "/office", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit vitae." },
         { label: "Contact", to: "/contact", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit cumque." },
      ]
   })
}
