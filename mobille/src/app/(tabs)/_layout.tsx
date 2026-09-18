import {Tabs} from "expo-router"

export default function TabsLayout(){
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title:"İşlemler"}} />
            <Tabs.Screen name="add" options={{title:"İşlemler"}} />
            <Tabs.Screen name="income" options={{title:"Gelir"}} />
            <Tabs.Screen name="expense" options={{title:"Gider"}} />
        </Tabs>
    )
}