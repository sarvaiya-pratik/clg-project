import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const InvoiceToPrint = ({ invoiceRef }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Hello, React-PDF!</Text>
            <Text>{`const greet = "Hello, World!";`}</Text>
          </View>
        </Page>
      </Document>

    </>
  )
}

export default InvoiceToPrint