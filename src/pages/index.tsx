import { Inter } from "next/font/google";
import HomePage from './Home';
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <section>
        <HomePage />
      </section>
  );
}
