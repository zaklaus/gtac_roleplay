* Custom key binds

* Ice cream job
    * VC: -862.39, -578.35, 11.10

* Edit messaging commands to use player position native util

* Rename remaining client funcs to player

* Player police officers can issue an APB for a player suspect. NPC police drive and walk around as normal in the game but if they spot the player suspect within a certain distance and line of sight, their position is sent to any player police officers via radio and shown as a blip on the radar. If the suspect evades the NPC police, the blip fades out at the last seen suspect location and eventually disappears, no longer available to player police officers. This means that the blip will continue to show other officers at the suspect's updated location until a) all police officers lose line of sight, b) suspect gets too far away or c) enters a house/business (losing line of sight with police unless they enter). All of these will cause the blip to show the suspects last known and seen location while the blip fades out and eventually disappears. Any officer that re-establishes line of sight within a certain distance will cause the suspect's blip to show again for all police. NPC police will NOT use the built-in wanted level system because this causes excessive spawning of police no matter where the suspect is generally completely unfair. Instead, scripting functions like ped.runTo, vehicle.setCarMission, vehicle.setCruiseSpeed, etc will be used to pursue the suspect. The logic in these functions is not perfect. The NPC officer can wreck the police car, get slowed down by traffic or stuck on something altogether, and the ped can be evaded by continously going around corners and such. All of this provides the ability for the suspect to have a chance of getting away. Changing skin/clothes or driving different/unknown vehicles reduces the NPC's line of sight and distance checking and thus reduces their chance of identifying them when near.

* Change addbiz/addhouse to use admin's current interior/vw for entrance