export enum TaskStatus {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED'
}

export enum TaskStatusId {
	PENDING = 1,
	IN_PROGRESS = 2,
	COMPLETED = 3,
	CANCELLED = 4
}

export const TaskStatusName = {
	1: 'PENDING',
	2: 'IN_PROGRESS',
	3: 'COMPLETED',
	4: 'CANCELLED'
} as const;

export enum TaskPriority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
	CRITICAL = 'CRITICAL'
}

export enum TaskPriorityId {
	LOW = 1,
	MEDIUM = 2,
	HIGH = 3,
	CRITICAL = 4
}

export const TaskPriorityName = {
	1: 'LOW',
	2: 'MEDIUM',
	3: 'HIGH',
	4: 'CRITICAL'
} as const;
