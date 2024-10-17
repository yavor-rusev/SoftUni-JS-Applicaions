export {}

/**
 * @typedef {Object} Team
 * @property {string} description
 * @property {string} logoUrl
 * @property {string} name
 * @property {number} _createdOn
 * @property {string} _id
 * @property {string} _ownerId
 * @property {number=} _updatedOn
 */

/**
 * @typedef {Object} Membership
 * @property {string} status
 * @property {Team} team
 * @property {string} teamId
 * @property {number} _createdOn
 * @property {string} _id
 * @property {string} _ownerId
 * @property {number=} _updatedOn
 */

/**
 * @typedef {Object} TeamInfo
 * @property {string} name
 * @property {string} logoUrl
 * @property {string} description 
 */

/**
 * @typedef {Object} UserData
 * @property {string} accessToken
 * @property {string} email
 * @property {string} username
 * @property {string} _id
 */

/**
 * @typedef {Object} User 
 * @property {string} email
 * @property {string} username
 * @property {string} _id
 */

/**
 * @typedef {Object} MemberStatus
 * @property {string} status
 * @property {string} teamId
 * @property {User} user
 * @property {number} _createdOn
 * @property {string} _id
 * @property {string} _ownerId
 * @property {number=} _updatedOn
 */

/**
 * @typedef {Object} RequestStatus
 * @property {string} status
 * @property {string} teamId 
 * @property {number} _createdOn
 * @property {string} _id
 * @property {string} _ownerId
 * @property {number=} _updatedOn
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} status
 * @property {string} teamId 
 * @property {number} _createdOn
 * @property {string} _id
 * @property {string} _ownerId
 * @property {number} _updatedOn
 */



