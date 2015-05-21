package bsu.model.dto;

public class RulesDto {
    private long flower1Id;
    private String flower1Name;
    private long flower2Id;
    private String flower2Name;

    public long getFlower1Id() {
        return flower1Id;
    }

    public void setFlower1Id(long flower1Id) {
        this.flower1Id = flower1Id;
    }

    public long getFlower2Id() {
        return flower2Id;
    }

    public void setFlower2Id(long flower2Id) {
        this.flower2Id = flower2Id;
    }

    public String getFlower1Name() {
        return flower1Name;
    }

    public void setFlower1Name(String flower1Name) {
        this.flower1Name = flower1Name;
    }

    public String getFlower2Name() {
        return flower2Name;
    }

    public void setFlower2Name(String flower2Name) {
        this.flower2Name = flower2Name;
    }
}
