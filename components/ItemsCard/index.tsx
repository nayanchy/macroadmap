import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoadmapItemType } from "@/types/roadmap";
import Link from "next/link";
import { BiLike } from "react-icons/bi";
import slugify from "slugify";

const ItemsCard = ({ item }: { item: RoadmapItemType }) => {
  const buttonClass = `button-${slugify(item.status, { lower: true })}`;
  console.log(buttonClass);
  return (
    <Link href={`/roadmap-items/${item._id}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-500">
            Created On: {new Date(item.createdAt).toDateString()}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <div className="flex-center gap-2 text-sm">
              <BiLike />
              {item.upvotes.length}
            </div>
            <div className={`rounded-full py-2 px-4 ${buttonClass} text-xs`}>
              {item.status}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemsCard;
