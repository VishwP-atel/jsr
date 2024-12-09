import {ComponentType} from "../_types/ComponentType"
const TextComponent : ComponentType = {
    Id:"",
    Name:"Text",
    Content:"Text",
    Child:null,
    Properties : null
}

const ContainerComponent :ComponentType = {
    Id:"",
    Name :"Container",
    Content : null,
    Child:[] as ComponentType[],
    Properties : null
}
const SectionComponent : ComponentType = {
Id:"",
Name :"Section",
Content : null,
Child:[] as ComponentType[],
Properties : null
}

const LinkComponent : ComponentType = {
    Id:"",
    Name :"Link",
    Content : "link",
    Child:[] as ComponentType[],
    Properties : {"href":"https://www.xyz.com"}
    }
const TwoCol : ComponentType = {
    Id:"",
    Name :"TwoCol",
    Content : null,
    Child:[] as ComponentType[],
    Properties : null
    }
const ThreeCol: ComponentType = {
    Id:"",
    Name :"ThreeCol",
    Content : null,
    Child:[] as ComponentType[],
    Properties : null
    }
export const AllComponent: ComponentType[] = [TextComponent,ContainerComponent,SectionComponent,LinkComponent,TwoCol,ThreeCol]