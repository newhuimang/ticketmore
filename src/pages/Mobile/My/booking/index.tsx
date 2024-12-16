import MobileNavBar from "@/components/Mobile/NavBar";

export default function MobileMyBooking({ title }: { title?: string }) {
  return (
    <>
      <MobileNavBar title={title} />
      {/* <Flex>{contents({ title })}</Flex> */}
    </>
  );
}
