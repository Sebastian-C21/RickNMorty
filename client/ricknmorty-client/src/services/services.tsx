import { gql, useQuery } from '@apollo/client';
import { getOperationAST } from 'graphql';
import { View, Text } from 'react-native';

const GET_CHARACTERS =  gql`
    query GetCharacters {
        characters {
            id
            name
            status
            species
            gender
            image
            deleted
            comments
        }
    }
`;

export default function List() {
    const { loading, error, data} = useQuery(GET_CHARACTERS)
    console.log(data)
    console.log(loading)
    console.log(error)
    return(
        <View>

        </View>
    )
}