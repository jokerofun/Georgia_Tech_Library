
/**
 * 
 * @export
 * @interface AuthorDto
 */
export interface AuthorDto {
    /**
     * 
     * @type {string}
     * @memberof AuthorDto
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AuthorDto
     */
    lastName?: string | null;
}

/**
 * 
 * @export
 * @interface BorrowingActivity
 */
export interface BorrowingActivity {
    /**
     * 
     * @type {number}
     * @memberof BorrowingActivity
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof BorrowingActivity
     */
    ssn: string;
    /**
     * 
     * @type {string}
     * @memberof BorrowingActivity
     */
    isbn: string;
    /**
     * 
     * @type {string}
     * @memberof BorrowingActivity
     */
    libraryName: string;
    /**
     * 
     * @type {Date}
     * @memberof BorrowingActivity
     */
    borrowingDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BorrowingActivity
     */
    dueDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BorrowingActivity
     */
    dateOfReturn?: Date | null;
}

/**
 * 
 * @export
 * @interface Card
 */
export interface Card {
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    cardNumber: string;
    /**
     * 
     * @type {Date}
     * @memberof Card
     */
    dateOfIssue: Date;
    /**
     * 
     * @type {Date}
     * @memberof Card
     */
    expirationDay: Date;
}

/**
 * 
 * @export
 * @interface Catalog
 */
export interface Catalog {
    /**
     * 
     * @type {string}
     * @memberof Catalog
     */
    isbn: string;
    /**
     * 
     * @type {string}
     * @memberof Catalog
     */
    libraryName: string;
    /**
     * 
     * @type {number}
     * @memberof Catalog
     */
    totalAmount: number;
    /**
     * 
     * @type {number}
     * @memberof Catalog
     */
    availableAmount?: number;
    /**
     * 
     * @type {string}
     * @memberof Catalog
     */
    description: string;
}

/**
 * 
 * @export
 * @interface ItemDto
 */
export interface ItemDto {
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    isbn: string;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    edition: string;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    publisher: string;
    /**
     * 
     * @type {string}
     * @memberof ItemDto
     */
    dateOfPublishing: string;
    /**
     * 
     * @type {ItemType}
     * @memberof ItemDto
     */
    itemType: ItemType;
    /**
     * 
     * @type {Array<AuthorDto>}
     * @memberof ItemDto
     */
    authors: Array<AuthorDto>;
    /**
     * 
     * @type {Array<Subject>}
     * @memberof ItemDto
     */
    subjects: Array<Subject>;
}

/**
 * 
 * @export
 * @interface ItemType
 */
export interface ItemType {
    /**
     * 
     * @type {string}
     * @memberof ItemType
     */
    name?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof ItemType
     */
    lendable?: boolean;
}

/**
 * 
 * @export
 * @interface ProblemDetails
 */
export interface ProblemDetails {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProblemDetails
     */
    status?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    detail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    instance?: string | null;
}

/**
 * 
 * @export
 * @interface Subject
 */
export interface Subject {
    /**
     * 
     * @type {string}
     * @memberof Subject
     */
    name?: string | null;
}
