import Link from "next/link";

export default function Footer() {
  return <footer className="bg-gray-100 py-4 text-center">
    <p className="text-gray-500">Made with 💖 by <Link href="https://github.com/Nitinshukla88"><span className="text-purple-600 font-semibold">Nitin Shukla</span></Link></p>
  </footer>;
}
