import { get, post, put, del } from "../data/request.js";


const endpoints = {
    allTeams: "/data/teams",    
    teamDetails: "/data/teams/",    
    requestMembership: "/data/members",        
    processMembership: "/data/members/",      
    searchInMemberships: "/data/members?where=",
    searchForAllMembers: "status%3D%22member%22",

    /** 
     * @param {string} userId 
     * @returns {string}
     */    
    searchForMyMemberships: (userId) => `_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
    
    /** 
     * @param {string} teamId 
     * @returns {string}
     */
    searchForTeamMemberships: (teamId) => `teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
    
    /** 
     * @param {number} page 
     * @param {number} pageSize 
     * @returns {string}
     */
    pagination: (page, pageSize) => `offset=${(page - 1) * pageSize}&pageSize=${pageSize}`
}


/** 
 * @param {number} page 
 * @param {number} pageSize 
 * @returns {Promise<import("../common/types.js").Team[]>} 
 */
export async function getTeamsForPaginator(page, pageSize) {
    return await get(endpoints.allTeams + "?" + endpoints.pagination(page, pageSize));    
}


/** 
 * @param {string} userId
 * @param {number} page 
 * @param {number} pageSize 
 * @returns {Promise<Array<import("../common/types.js").Membership>>}
 */
export async function getMyMembershipsForPaginator(userId, page, pageSize) {    
    return await get(endpoints.searchInMemberships + endpoints.searchForMyMemberships(userId) + "&" + endpoints.pagination(page, pageSize));
}


/** 
 * @returns {Promise<import("../common/types.js").Membership[]>}
 */
export async function getAllMembers() {
    return await get(endpoints.searchInMemberships + endpoints.searchForAllMembers);
}


/** 
 * @param {import("../common/types.js").TeamInfo} teamInfo
 * @returns {Promise<import("../common/types.js").Team>}
 */
export async function createTeam(teamInfo) {
    return await post(endpoints.allTeams, teamInfo);
}


/** 
 * @param {string} teamId
 * @returns {Promise<import("../common/types.js").Team>}
 */
export async function getTeamDetails(teamId) {
    return await get(endpoints.teamDetails + teamId);
}


/**
 * @param {string} teamId
 * @param {import("../common/types.js").TeamInfo} teamInfo
 * @returns {Promise<import("../common/types.js").Team>}
 */
export async function editTeamDetails(teamId, teamInfo) {
    return await put(endpoints.teamDetails + teamId, teamInfo);
}


/**
 * @param {string} teamId 
 * @returns {Promise<import("../common/types.js").MemberStatus[]>}
 */
export async function getTeamMemberships(teamId) {
    return await get(endpoints.searchInMemberships + endpoints.searchForTeamMemberships(teamId));
}


/** 
 * @param {string} teamId 
 * @returns {Promise<import("../common/types.js").RequestStatus>}
 */
export async function sendMembershipRequest(teamId) {
    return await post(endpoints.requestMembership, { teamId });
}


/** 
 * @param {string} membershipId 
 * @returns {Promise<import("../common/types.js").RequestStatus>}
 */
export async function approveMembershipRequest(membershipId) {
    return await put(endpoints.processMembership + membershipId, {status: "member"});
}


/** 
 * @param {string} membershipId 
 * @returns {Promise<{_deletedOn: number}>}
 */
export async function stopMembership(membershipId) {
    return await del(endpoints.processMembership + membershipId);
}


/** 
 * @param {string} userId 
 * @returns {Promise<import("../common/types.js").Membership[]>}
 */
export async function getMyMemberships(userId) {
    return await get(endpoints.searchInMemberships + endpoints.searchForMyMemberships(userId));
}


/** 
 * @param {string[]} teamsIdsArray 
 * @returns {Promise<import("../common/types.js").TeamMember[]>}
 */
export async function getTheseTeamsMembers(teamsIdsArray) {    
    const idsAsString = teamsIdsArray.join('","');   
    const encodedQuery = encodeURIComponent(`teamId IN ("${idsAsString}") AND status="member"`);    
    
    return await get(endpoints.searchInMemberships + encodedQuery);
}


/** 
 * @returns {Promise<number | string>}
 */
export async function getTeamsCount() {
    return await get(endpoints.allTeams + "?count");
}


