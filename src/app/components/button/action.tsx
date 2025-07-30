import Button from "./button";
import {
	DownloadIcon,
	HeartIcon,
	AppleIcon,
	ShareIcon,
	StarIcon,
} from "./icons";

const ActionButton = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-8">
			{/* Action Buttons */}
			<div className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Button variant="default" iconLeft={<DownloadIcon />}>
						Save
					</Button>
					<Button variant="default" iconLeft={<AppleIcon />}>
						Apply Pay
					</Button>
					<Button variant="outline" iconLeft={<HeartIcon />}>
						Favorite
					</Button>
					<Button variant="secondary" iconLeft={<StarIcon />}>
						Rate
					</Button>
					<Button variant="ghost" iconLeft={<ShareIcon />}>
						Share
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ActionButton;
