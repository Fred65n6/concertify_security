import React from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Link,
  Img,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const VenueSchedule = () => {
  return (
    <ChakraProvider>
      <TableContainer>
        <Heading>Event Schedule at Royal Arena</Heading>
        <Table variant="simple">
          <TableCaption>Event Schedule at Royal Arena</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Artist</Th>
              <Th isNumeric>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>September 4th 2023</Td>
              <Td>Sunday 19.30</Td>
              <Td>Drake</Td>
              <Td isNumeric>
                <Link>Learn More</Link>
              </Td>
            </Tr>
            <Tr>
              <Td>September 4th 2023</Td>
              <Td>Sunday 19.30</Td>
              <Td>Drake</Td>
              <Td isNumeric>
                <Link>Learn More</Link>
              </Td>
            </Tr>
            <Tr>
              <Td>September 4th 2023</Td>
              <Td>Sunday 19.30</Td>
              <Td>Drake</Td>
              <Td isNumeric>
                <Link>Learn More</Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </ChakraProvider>
  );
};

export default VenueSchedule;
