import * as React from 'react';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeList = () => {
  const [expanded, setExpanded] = React.useState(true);
  const navigation=useNavigation()


  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="PizzaApp Pages">
      <List.Accordion
      style={{marginTop:0}}
        title="PizzaApp Pages"
        expanded={expanded}
        onPress={handlePress}
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="Home page" onPress={()=>navigation.navigate("Home")}
        />
        <List.Item title="Product page"  onPress={()=>navigation.navigate("Product")} />
      </List.Accordion>

    </List.Section>
  );
};

export default HomeList;