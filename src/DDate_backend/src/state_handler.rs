
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::DefaultMemoryImpl;
use ic_stable_structures::StableBTreeMap;
use std::cell::RefCell;
use ic_stable_structures::{storable::Bound,Storable};
use candid::{Decode, Encode};
use std::borrow::Cow;
use crate::profile_creation::UserProfileCreationInfo;



pub type Memory = VirtualMemory<DefaultMemoryImpl>;
pub type UserProfiles = StableBTreeMap<String, UserProfileCreationInfo, Memory>;


const PROFILE_DATA: MemoryId = MemoryId::new(0);

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    pub static STATE: RefCell<State> = RefCell::new(
        MEMORY_MANAGER.with(|mm| State {
            user_profiles:UserProfiles::init(mm.borrow().get(PROFILE_DATA))
        })
    );
}

pub fn read_state<R>(f: impl FnOnce(&State) -> R) -> R {
    STATE.with(|cell| f(&cell.borrow()))
}

pub fn mutate_state<R>(f: impl FnOnce(&mut State) -> R) -> R {
    STATE.with(|cell| f(&mut cell.borrow_mut()))
}


pub fn get_profiledata_memory() -> Memory {
    MEMORY_MANAGER.with(|m| m.borrow().get(PROFILE_DATA))
}


pub struct State {

    pub user_profiles : StableBTreeMap<String, UserProfileCreationInfo,Memory>,
    

}

impl State {
    pub fn new() -> Self {
        Self {

            user_profiles: init_file_contents()
        }
    }
}


impl Default for State {
    fn default() -> Self {
        State::new()
    }
}


pub fn init_file_contents() -> StableBTreeMap<String, UserProfileCreationInfo,Memory> {
    StableBTreeMap::init(get_profiledata_memory())

}



const MAX_VALUE_SIZE: u32 = 600;

impl Storable for UserProfileCreationInfo{
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}


