import { Card, CardContent, CardHeader } from "../ui/card";

interface ProfileCardProps {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, avatar, bio }) => {
  return (
    <Card className="bg-black/50 border border-gray-700 text-center font-mono transform transition-all duration-300 hover:border-neon-green hover:scale-105 hover:shadow-lg hover:shadow-neon-green/20">
      <CardHeader className="p-4">
        <div className="relative w-32 h-32 mx-auto">
          <img src={avatar} alt={name} className="rounded-full w-full h-full object-cover border-2 border-neon-green/50" />
          <div className="absolute inset-0 rounded-full bg-neon-green/10 animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold text-neon-green">{name}</h3>
        <p className="text-sm text-gray-400 mt-1">{role}</p>
        <p className="text-sm text-gray-300 mt-4">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
