import {ComponentType} from "../_types/ComponentType"
const TextComponent : ComponentType = {
    Name:"Text",
    Content:"Text",
    Properties : null
}

const ContainerComponent :ComponentType = {
    Name :"Container",
    Content : [] as ComponentType[],
    Properties : null
}

export const AllComponent: ComponentType[] = [TextComponent,ContainerComponent]