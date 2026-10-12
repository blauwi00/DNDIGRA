CREATE TABLE `player_progress` (
	`owner` text PRIMARY KEY NOT NULL,
	`tutorial_version` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
