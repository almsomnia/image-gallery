export default function (current: number, index: number) {
   const diff = Math.abs(current - index)
   switch (diff) {
      case 0:
         return 1
      case 1:
         return 0.25
      case 2:
         return 0.1
      default:
         return 0
   }
}
