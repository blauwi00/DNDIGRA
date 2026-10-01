CREATE TABLE `heroes` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`sheet` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_heroes_owner` ON `heroes` (`owner`);