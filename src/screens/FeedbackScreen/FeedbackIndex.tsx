import {
    Card,
    Button,
    Textarea,
    useMantineTheme,
    Title,
    FileInput,
    Text
  } from "@mantine/core";
  import { showNotification } from "@mantine/notifications";
  import { useState } from "react";
  import { Image } from "react-feather";
  import styled from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
  
  const SFeedback = styled.div`
    width: 100%;
  `;
  
  function FeedbackIndex() {
    const mantineTheme = useMantineTheme();
    const [feedback, setFeedback] = useState<{
      content: string;
      image: File | null;
    }>({
      content: "",
      image: null
    });
  
    const [loading, setLoading] = useState(false);
    const store = useStores();
  
    return (
      <SFeedback>
        <Card
          shadow="lg"
          style={{
            border: "1.5px dashed " + mantineTheme.colors.blue[3]
          }}
          className="relative flex flex-col items-center"
        >
          <Title order={3} size={"md"}>
            Help Us Become Better
          </Title>
          <Text color={"dimmed"} size="sm" className="my-2 text-center">
            What did you like most about our service? What areas do you think we
            can improve on for your next visit?
          </Text>
          <Textarea
            className="mt-2 w-full text-xl"
            value={feedback.content}
            onChange={(e) => {
              setFeedback((p) => {
                return { ...p, content: e.target.value };
              });
            }}
            placeholder="Every suggestion helps us deliver better."
            autosize
            minRows={8}
            maxRows={15}
          />
          {/* <FileInput
            className="mt-1 w-full"
            value={feedback.image}
            accept="image/png,image/jpeg"
  
            onChange={(file) => {
              if (file)
                setFeedback((p) => {
                  return { ...p, image: file };
                });
            }}
            icon={<Image size={14} />}
          /> */}
          <Button
            loading={loading}
            disabled={feedback.content === "" && feedback.image === undefined}
            variant="light"
            className="mt-4 w-full"
            // onClick={() => {
            //   setLoading(true);
            //   store.miscStore
            //     .CreateFeedback(feedback.content, feedback.image || undefined)
            //     .then(() => {
            //       setLoading(false);
            //       showNotification({
            //         title: "Feedback Submitted.",
            //         message: "Thank you for your valuable feedback.",
            //         color: "green"
            //       });
            //       setFeedback({ content: "", image: null });
            //     })
            //     .catch((err) => {
            //       setLoading(false);
            //       showNotification({
            //         title: "Feedback Not Submitted.",
            //         message: "Something went wrong, please try again.",
            //         color: "red"
            //       });
            //     });
            // }}
          >
            Send Feedback
          </Button>
        </Card>
      </SFeedback>
    );
  }
  
  export default FeedbackIndex;