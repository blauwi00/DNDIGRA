CREATE TABLE `worlds` (
	`id` text PRIMARY KEY NOT NULL,
	`hero_id` text NOT NULL,
	`owner` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`snapshot` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`hero_id`) REFERENCES `heroes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_worlds_owner_hero` ON `worlds` (`owner`,`hero_id`);