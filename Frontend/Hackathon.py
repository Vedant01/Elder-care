from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling
from transformers import Trainer, TrainingArguments
import torch

# Load pre-trained GPT model and tokenizer
model_name = "gpt2"  # You can use other variants like "gpt2-medium" or "gpt2-large" for larger models
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Load your dataset
train_dataset = TextDataset(
    tokenizer=tokenizer,
    file_path="requirements.txt",  # Path to your training data file
    block_size=128  # Maximum length of input sequences
)

# Define data collator
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False
)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./llm",
    overwrite_output_dir=True,
    num_train_epochs=3,  # Number of training epochs
    per_device_train_batch_size=4,  # Batch size per GPU/CPU
    save_steps=10_000,  # Number of steps between checkpoint saves
    save_total_limit=2,  # Maximum number of checkpoints to keep
)

# Define Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=train_dataset
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model
model.save_pretrained("fine_tuned_llm")
