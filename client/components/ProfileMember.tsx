import "styles/ProfileMember.css";
import Image from "next/image";
import { User } from "@/types";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

export default function ProfileMember({ members }: { members: User[] }) {
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sms:grid-cols-2 gap-4">
      {members?.map((member, index) => (
        <div key={index} className="our-team">
          <div className="flexCenter w-full h-fit">
            <div className="picture">
              <Image
                className="img-fluid w-full h-full"
                src={member?.avatar}
                blurDataURL={member?.avatar}
                alt="avatar.pnj"
                width={130}
                height={130}
              />
            </div>
          </div>

          <div className="team-content">
            <h3 className="name text-2xl">{member?.username}</h3>
            <h4 className="title">{member?.role}</h4>
          </div>

          <ul className="social">
            <li>
              <FaFacebookF className="text-xl fill-white" />
            </li>
            <li>
              <FaTwitter className="text-xl fill-white" />
            </li>
            <li>
              <FaGooglePlusG className="text-3xl fill-white" />
            </li>
            <li>
              <FaLinkedinIn className="text-xl fill-white" />
            </li>
          </ul>
        </div>
      ))}
    </section>
  );
}
