import { Text } from "@mantine/core";
interface NavbarMobileItemProps {
  title: string;
  icon: JSX.Element;
  badge?: JSX.Element;
}

function NavbarMobileItem(props: NavbarMobileItemProps) {
  return (
    <Text
      style={{
        fontSize: "20px",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <div className="flex gap-2" style={{ alignItems: "center" }}>
        {props.icon}
        {props.title}
      </div>
      {props.badge}
    </Text>
  );
}

export default NavbarMobileItem;